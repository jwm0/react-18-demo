import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { Suspense, useEffect, useState } from "react";

import "./App.css";
import { Product } from "./Product";

const endpoint = "https://demo.saleor.io/graphql/";

function useProducts() {
  return useQuery("products", async () => {
    const data = await request(
      endpoint,
      gql`
        query {
          products(first: 10, channel: "default-channel") {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `
    );
    return data;
  });
}

export function Products({ search }) {
  const { data } = useProducts();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const products = [...Array(1)].map(() => data.products.edges).flat();
    const filteredProducts = products.filter(({ node }) =>
      node.name.toLowerCase().includes(search.toLowerCase())
    );

    setProducts(filteredProducts);
  }, [data, search]);

  return (
    <div>
      <ul>
        {products.map(({ node }, i) => (
          <li key={i}>
            <p>{node.name}</p>
            <Suspense fallback={<div>Fallback 2</div>}>
              <Product id={node.id} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
}
