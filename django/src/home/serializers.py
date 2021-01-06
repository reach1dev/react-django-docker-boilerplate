from home.models import Event
from rest_framework import serializers


class EventSerializer(serializers.HyperlinkedModelSerializer):
    thumb_file = serializers.ReadOnlyField()
    crop_file = serializers.ReadOnlyField()

    class Meta:
        model = Event
        fields = [
            'speed', 'evt_time', 'customer', 'photo_file', 'license_plate', 'vehicle_type', 'thumb_file', 'crop_file'
        ]
