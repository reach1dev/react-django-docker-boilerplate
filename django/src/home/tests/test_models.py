from django.test import TestCase

from home.models import Event


class CompanyTestCase(TestCase):
    def test_str(self):
        """Test for string representation."""
        event = Event.objects.first
        event_name = str(event.customer) + str(event.evt_time)
        print (event_name)
        self.assertEqual(str(event), event_name)