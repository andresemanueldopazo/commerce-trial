import usePrice from "@framework/product/use-price"
import OrderItem from "./OrderItem"
import cn from 'clsx'
import s from './OrderItem.module.css'
import { OrderResume } from "@commerce/types/customer"

interface OrderProps {
  order: OrderResume
}

const Order: React.FC<OrderProps> = ({order}) => {
  const { price: totalPrice } = usePrice({
    amount: order.totalPrice,
    currencyCode: order?.currency.code!,
  })

  const { price: shippingPrice } = usePrice({
    amount: order.shippingWithTax,
    currencyCode: order?.currency.code!,
  })

  return (
    <li
      className={cn(s.root)}
    >
      <div>
        <div>
          <span> Code: </span>
          <span> {order.code} </span>
        </div>
        <div>
          <span> Placed at: </span>
          <span> {order.orderPlacedAt} </span>
        </div>
        <div> 
          <span> State: </span>
          <span> {order.state} </span>
        </div>
        <div>
          <ul>
            {order.lineItems.map((item: any) =>
              <OrderItem
                key={item.id}
                item={item}
                currencyCode={order?.currency.code!}
              />
            )}
          </ul>
        </div>
        <div>
          <span> Shipping price: </span>
          {totalPrice &&
            <span> {shippingPrice} </span>
          }
        </div>
        <div>
          <span> Total: </span>
          {totalPrice &&
            <span> {totalPrice} </span>
          }
        </div>
      </div>
    </li>
  )
}

export default Order
