import Pagination from "core/components/Pagination";
import { ProductsResponse } from "core/types/Products";
import { makeRequest } from "core/utils/request";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card";

const List  = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const linesPerPage: number = 4;
    
    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: linesPerPage
        };

        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => { setIsLoading(false) })

    }, [activePage]);

    
    const history =  useHistory();

    console.log(productsResponse);

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-list-container">
                {productsResponse?.content.map(product => ( 
                                            <Card product={product} key={product.id}  />   
                                                
                                            )
                                        )
                }
                 {
                productsResponse && 
                    <Pagination 
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
            }
            </div>

        </div>
    );
}

export default List;