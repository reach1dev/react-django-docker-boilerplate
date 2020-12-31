# models.py
from django.db import models


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
