import client from "../src/components/ApolloClient";
import { PAGE_SLUGS } from "../src/queries/page-by-slug";
import { PRODUCT_SLUGS } from "../src/queries/product-by-slug";
import { PRODUCT_CATEGORIES_SLUGS } from "../src/queries/product-by-category";

function generateSiteMap(pages, products, productCategories) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
       <url>
         <loc>https://shop.hotham.vn/</loc>
       </url>
         })
         .join("")}
         ${productCategories.nodes
           .map(({ slug }) => {
             return `
        <url>
            <loc>${`https://shop.hotham.vn/danh-muc-san=pham/${slug}/`}</loc>
        </url>
        `;
           })
           .join("")}
        ${products.nodes
          .map(({ slug }) => {
            return `
        <url>
            <loc>${`https://shop.hotham.vn/cua-hang/${slug}/`}</loc>
        </url>
        `;
          })
          .join("")}
        
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const {
    data: { pages },
  } = await client.query({
    query: PAGE_SLUGS,
  });

  const {
    data: { products },
  } = await client.query({
    query: PRODUCT_SLUGS,
  });

  const {
    data: { productCategories },
  } = await client.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(pages, products, productCategories);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
