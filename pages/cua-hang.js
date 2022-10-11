import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import client from '../src/components/ApolloClient';
import CUA_HANG_QUERY from "../src/queries/cua-hang";

export default function CuaHang (props) {

	const { products } = props || {};

	return (
			<Layout>
				{/*Products*/ }
				<div className="products container mx-auto my-32 px-4 xl:px-0">
					<h2 className="products-main-title main-title mb-5 text-xl uppercase"><span className="main-title-inner">Được khuyến nghị</span></h2>
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
						{ products.length ? (
							products.map( product => <Product key={ product.id } product={ product }/> )
						) : '' }
					</div>
				</div>

			</Layout>
	)
};

export async function getStaticProps () {

	const { data } = await client.query( {
		query: CUA_HANG_QUERY,
	} );

	return {
		props: {
			products: data?.products?.nodes ? data.products.nodes : []
		},
		revalidate: 1
	}

};
