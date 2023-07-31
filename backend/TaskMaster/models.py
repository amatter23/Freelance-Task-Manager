from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    


class Addresses(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name="addresses")
    title = models.CharField(max_length=255)
    address = models.CharField(max_length=255)

class Task (models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.PROTECT , related_name="task")
    addresse = models.ForeignKey(Addresses, on_delete=models.PROTECT, related_name="task")
    discription = models.TextField()
    file = models.FileField(upload_to='media',null=True )
    date = models.DateField()



class Item (models.Model):
    task = models.ForeignKey(Task, on_delete=models.PROTECT, related_name='item')
    title = models.CharField(max_length=255)
    sell_price = models.DecimalField(max_digits=10 ,decimal_places=2)
    buy_price = models.DecimalField(max_digits=10 ,decimal_places=2)
    profit = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def save (self,*args, **kwargs ):
        self.profit = self.sell_price - self.buy_price 
        super(Item, self).save(*args, **kwargs)
               

 