from PIL import Image, ImageOps
from pathlib import Path


SOURCE = Path("img")
OUTPUT = Path("img_web")

MAX_WIDTH = 1920
QUALITY = 85


extensions = [
    ".jpg",
    ".jpeg",
    ".png"
]


def resize_image(file_path):

    try:
        relative_path = file_path.relative_to(SOURCE)

        new_path = OUTPUT / relative_path
        new_path = new_path.with_suffix(".webp")

        new_path.parent.mkdir(
            parents=True,
            exist_ok=True
        )


        img = Image.open(file_path)

        img = ImageOps.exif_transpose(img)

        if img.width > MAX_WIDTH:

            ratio = MAX_WIDTH / img.width

            new_height = int(
                img.height * ratio
            )

            img = img.resize(
                (MAX_WIDTH, new_height),
                Image.LANCZOS
            )


        img.save(
            new_path,
            "WEBP",
            quality=QUALITY,
            method=6
        )


        old_size = file_path.stat().st_size / 1024 / 1024
        new_size = new_path.stat().st_size / 1024 / 1024


        print(
            f"{file_path.name}: "
            f"{old_size:.1f}MB -> {new_size:.2f}MB"
        )


    except Exception as e:
        print(
            f"Ошибка {file_path}: {e}"
        )



for file in SOURCE.rglob("*"):

    if file.suffix.lower() in extensions:

        resize_image(file)


print("\nГотово!")