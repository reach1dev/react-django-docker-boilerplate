# models.py
from django.db import models
from django.core.files.storage import default_storage


class Event(models.Model):
    speed = models.FloatField()
    evt_time = models.DateTimeField()
    customer = models.IntegerField()
    photo_file = models.CharField(max_length=255)
    serialnum = models.IntegerField()
    flags = models.IntegerField()
    license_plate = models.CharField(max_length=80)
    vehicle_type = models.CharField(max_length=10)
    x1 = models.IntegerField()
    y1 = models.IntegerField()
    x2 = models.IntegerField()
    y2 = models.IntegerField()
    sequence_id = models.IntegerField()

    class Meta:
        db_table = 'events'
        ordering = ['evt_time']
        managed = False

    def __str__(self):
        return str(self.customer) + str(self.evt_time)

    def thumb_file(self):
        if self.photo_file is None or not default_storage.exists("./" + self.photo_file):
            return "/placeholder.jpg"
        thumb_file_path = self.photo_file.replace(".jpg", ".thumb.jpg")
        if default_storage.exists("./" + thumb_file_path):
            return thumb_file_path
        return self.photo_file

    def crop_file(self):
        if self.photo_file is None or not default_storage.exists("./" + self.photo_file):
            return "/placeholder.jpg"
        crop_file_path = self.photo_file.replace(".jpg", ".crop.jpg")
        if default_storage.exists("./" + crop_file_path):
            return crop_file_path
        return self.photo_file
