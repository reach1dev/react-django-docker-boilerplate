username = "brandx"
from django.contrib.auth.models import User
User.objects.get(username=username).delete()