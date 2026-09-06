import os
import sys
from pathlib import Path

project_dir = Path(__file__).resolve().parent.parent / "django_assga"
sys.path.insert(0, str(project_dir))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "assga_project.settings")

from assga_project.wsgi import application

app = application
