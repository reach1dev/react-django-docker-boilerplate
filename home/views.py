from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from home.models import Event
from home.serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if 'lastUpdatedTime' not in self.request.query_params:
            events = Event.objects.filter(customer=self.request.user.id)
        else:
            last_updated_time = self.request.query_params['lastUpdatedTime']
            print ("last_updated_time " + last_updated_time)
            events = Event.objects.filter(customer=self.request.user.id, evt_time__gt=last_updated_time)
        return events
