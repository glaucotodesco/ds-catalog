import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/types/Products';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    product: Product;
    onRemove: (productId: number) => void;
}


const Card = ({ product, onRemove }: Props) => {
    return (
        <div className="card-base product-card-admin">
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    <img src={product.imgUrl}
                        alt={product.name}
                        className="product-card-image-admin"
                    />
                </div>
                <div className="col-7 py-3">
                    <h3 className="product-card-name-admin">
                        {product.name}
                    </h3>
                    <ProductPrice price={product.price} />
                    <div>
                        {product.categories.map(category => (
                            <span className="badge badge-pill badge-secondary mr-2">{category.name}</span>
                        ))}


                    </div>

                </div>
                <div className="col-3 py-3 pr-5">
                    <Link
                        to={`/admin/products/${product.id}`}
                        type="button"
                        className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit">
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-block border-radius-10"
                        data-toggle="modal"
                        onClick={() => onRemove(product.id)}
                    >

                        EXCLUIR
                    </button>
                </div>
            </div>

            
            <div id="myModal" className="modal fade">
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header flex-column">
                            <div className="icon-box">
                                <i className="material-icons">&#xE5CD;</i>
                            </div>
                            <h4 className="modal-title w-100">Are you sure?</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Do you really want to delete these records? This process cannot be undone.</p>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )

}
export default Card;