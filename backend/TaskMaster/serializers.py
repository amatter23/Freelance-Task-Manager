from rest_framework import serializers
from TaskMaster.models import Customer, Addresses, Task, Item
from django.db import transaction
class AddressesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addresses
        fields = ['title', 'address',"id"]


class CustomersSerializer(serializers.ModelSerializer):
    addresses = AddressesSerializer(many=True)

    class Meta: 
        model = Customer
        fields = ['id', 'name', 'phone', 'addresses']

    def create(self, validated_data):
        with transaction.atomic():
            addresses_data = validated_data.pop('addresses')
            customer = Customer.objects.create(**validated_data)

            for address_data in addresses_data:
                Addresses.objects.create(customer=customer, **address_data)

            return customer
        


class ItemSerializer (serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['title','buy_price','sell_price', "profit"]





class customerTaskSerializer (serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name','id']


class TaskGetSerializer (serializers.ModelSerializer):
    customer = customerTaskSerializer()
    addresse = AddressesSerializer()
    item = ItemSerializer(many=True)
    total_sell_price = serializers.SerializerMethodField()
    total_buy_price = serializers.SerializerMethodField()
    total_profit = serializers.SerializerMethodField()
    class Meta: 
        model = Task
        fields = ['discription', 'file', 'date','customer', 'addresse' ,'item', 'total_sell_price', 'total_buy_price', 'total_profit',]

    def get_total_sell_price(self, task):
        return sum(item.sell_price for item in task.item.all())

    def get_total_buy_price(self, task):
        return sum(item.buy_price for item in task.item.all())

    def get_total_profit(self, task):
        return sum(item.profit for item in task.item.all())




class TaskPostSerializer (serializers.ModelSerializer):
    item = ItemSerializer(many=True)
    class Meta: 
        model = Task
        fields = ['discription', 'file', 'date','customer', 'addresse' ,'item']

    def create(self, validated_data):
        with transaction.atomic():
            item_data = validated_data.pop('item')
            task = Task.objects.create(**validated_data)

            for item_data in item_data:
                Item.objects.create(task=task, **item_data)

            return task
