from home.models import Event
from rest_framework import serializers


class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ['speed', 'evt_time', 'customer', 'photo_file', 'license_plate', 'vehicle_type']
