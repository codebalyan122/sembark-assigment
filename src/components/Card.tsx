import { Card } from "antd";
import ButtonComp from "./Button";
import Link from "antd/es/typography/Link";

const { Meta } = Card;

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
interface CardProps {
  title: string;
  description: string;
  price: number;
  id: number;
  image: string;
  item: Product;
}

  export const truncateDesc = (text: string, maxLength: number = 100): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

const CardComponent = ({ title, description, price, id, image }: CardProps) => {




  return (
    <Link href={`/product/${id}`} style={{ textDecoration: 'none' }}>
  
    <Card
      hoverable
      style={{ 
        width: 240, 
        height: 400, 
        display: 'flex',
        flexDirection: 'column'
      }}
      cover={
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img 
            alt="example" 
            src={image} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </div>
      }
      styles={{
        body: { 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '16px'
        }
      }}
    >
      <div>
        <Meta title={title} description={truncateDesc(description, 50)} />
        <p className="text-lg font-semibold mt-4 mb-4">Price: ${price}</p>
      </div>
      <ButtonComp  title={"View Product"} />
    </Card>
      </Link>
  );
};

export default CardComponent;