from rest_framework.viewsets import ModelViewSet
from TaskMaster.models import Customer, Addresses, Task, Item
from TaskMaster.serializers import *


class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.prefetch_related('addresses').all()
    serializer_class = CustomersSerializer

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.select_related('customer', 'addresse').prefetch_related('item')
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TaskPostSerializer
        return TaskGetSerializer

class AddressesViewSet (ModelViewSet):
    queryset = Addresses.objects.select_related('customer')
    # queryset = Addresses.objects.all()
    serializer_class = AddressesSerializer


