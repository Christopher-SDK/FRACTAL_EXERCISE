export class Order{
    orderId: number= 0;
    orderNumber: string='';
    orderDate: Date=new Date(Date.now()); 
    numOfProducts: number= 0;
    status: string='';
    userId: number =0; 
}