import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button,{BUTTON_TYPES} from '../button/button.component';
import { Footer, Name, Price, ProductCardContainer } from './product-card.styles';


const ProductCard = ({product}) => {
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);

    const {name,price,imageUrl} = product;
     
    const addCartItem = () => {
      dispatch(addItemToCart(cartItems,product));
    }

    return (
        <ProductCardContainer>
         <img src={imageUrl} alt={name}/>
         <Footer>
           <Name>{name}</Name>
           <Price>{price}</Price>
         </Footer>
         <Button buttonType={BUTTON_TYPES.inverted} onClick={addCartItem}>Add to cart</Button>
        </ProductCardContainer>
    )
};
export default ProductCard;
