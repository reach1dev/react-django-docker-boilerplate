username = "brandx"
password = "brandx"
email = "brandx@gmail.com"
firstname = "brandx"
lastname = "brandx"
from django.contrib.auth.models import User
user=User.objects.create_user(username, password=password)
user.first_name=firstname
user.last_name=lastname
user.email = email
user.is_superuser=False
user.is_staff=False
user.save()