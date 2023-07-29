from django.contrib import admin

from TaskMaster.models import Customer, Addresses, Task, Item

admin.site.register(Customer)
admin.site.register(Addresses)
admin.site.register(Task)
admin.site.register(Item)