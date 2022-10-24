import Layout from "../src/components/Layout";
import CartItemsContainer from "../src/components/cart/cart-page/CartItemsContainer";
import client from "../src/components/ApolloClient";
import HEADER_FOOTER_QUERY from "../src/queries/header-footer";

const Cart = ({ siteSeo, mainMenu, mobileMenu, footerMenu, footerMenu2 }) => {
  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
    >
      <CartItemsContainer />
    </Layout>
  );
};
export async function getStaticProps() {
  const { data } = await client.query({
    query: HEADER_FOOTER_QUERY,
  });

  return {
    props: {
      mainMenu: data?.mainMenu?.nodes ? data.mainMenu.nodes : {},
      footerMenu: data?.footerMenu?.nodes ? data.footerMenu.nodes : {},
      footerMenu2: data?.footerMenu2?.nodes ? data.footerMenu2.nodes : {},
      mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
      siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
    },
    revalidate: 1,
  };
}

export default Cart;
