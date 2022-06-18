import Image from 'next/image'
import Link from 'next/link'
import s from '../OrderItem.module.css'
import { useUI } from '@components/ui/context'
import usePrice from '@framework/product/use-price'

const placeholderImg = '/product-img-placeholder.svg'

interface OrderItemProps {
  item: any
  currencyCode: any
}

const OrderItem: React.FC<OrderItemProps> = ({item, currencyCode, ...rest}) => {
  const { closeSidebarIfPresent } = useUI()

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  })

  return (
    <li
      {...rest}
    >
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer z-0">
          <Link href={`/product/${item.path}`}>
            <a>
              <Image
                onClick={() => closeSidebarIfPresent()}
                className={s.productImage}
                width={150}
                height={150}
                src={item.variant.image?.url || placeholderImg}
                alt={item.variant.image?.altText || "Product Image"}
                unoptimized
              />
            </a>
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-base">
          <Link href={`/product/${item.path}`}>
            <a>
              <span
                className={s.productName}
                onClick={() => closeSidebarIfPresent()}
              >
                {item.name}
              </span>
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span> {item.quantity} </span>
          {price &&
            <span> {price} </span>
          }
        </div>
      </div>
    </li>
  )
}

export default OrderItem
