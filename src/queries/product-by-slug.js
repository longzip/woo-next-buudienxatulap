import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: ID!) {
    mainMenu: menus(where: { location: PRIMARY }) {
      nodes {
        menuItems {
          nodes {
            path
            url
            label
            id
          }
        }
        name
      }
    }
    mobileMenu: menus(where: { location: PRIMARY_MOBILE }) {
      nodes {
        menuItems {
          nodes {
            url
            label
            id
            path
          }
        }
        name
      }
    }
    footerMenu: menus(where: { location: FOOTER }) {
      nodes {
        menuItems {
          nodes {
            url
            label
            id
            path
          }
        }
        name
      }
    }
    footerMenu2: menus(where: { location: FOOTER_MENU_2 }) {
      nodes {
        menuItems {
          nodes {
            url
            label
            id
            path
          }
        }
        name
      }
    }
    siteSeo: seo {
      schema {
        logo {
          id
          altText
          sourceUrl(size: THUMBNAIL)
        }
        siteName
        homeUrl
      }
    }
    productCategories(where: { hideEmpty: true, hierarchical: true }) {
      nodes {
        id
        name
        slug
        parentId
        image {
          id
          sourceUrl(size: WOOCOMMERCE_GALLERY_THUMBNAIL)
          srcSet
          title
        }
        products(where: { stockStatus: IN_STOCK, supportedTypesOnly: true }) {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
    product(id: $slug, idType: SLUG) {
      id
      productId: databaseId
      averageRating
      slug
      description
      shortDescription
      galleryImages {
        nodes {
          id
          title
          altText
          mediaItemUrl
          sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
          url: sourceUrl(size: WOOCOMMERCE_SINGLE)
        }
      }
      image {
        id
        uri
        title
        srcSet
        sourceUrl(size: WOOCOMMERCE_SINGLE)
      }
      name
      ... on SimpleProduct {
        price
        id
        regularPrice
        seo {
          fullHead
        }
      }
      ... on VariableProduct {
        price
        id
        regularPrice
        seo {
          fullHead
        }
      }
      ... on ExternalProduct {
        price
        id
        regularPrice
        externalUrl
        seo {
          fullHead
        }
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
              regularPrice
              seo {
                fullHead
              }
            }
          }
        }
        id
      }
    }
  }
`;

export const PRODUCT_SLUGS = gql`
  query Products {
    products(first: 5000) {
      nodes {
        id
        slug
      }
    }
  }
`;
