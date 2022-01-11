import "./App.css";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const endpoint = "https://demo.saleor.io/graphql/";

function useProduct(id) {
  return useQuery(["product", id], async () => {
    const data = await request(
      endpoint,
      gql`
        query {
          product(id: "${id}", channel: "default-channel") {
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                    currency
                  }
                }
              }
            }
          }
        }
      `
    );
    return data;
  });
}

export function Product({ id }) {
  const { data } = useProduct(id);
  const { amount, currency } = data.product.pricing.priceRange.start.gross;

  return (
    <div>
      <p>
        from {amount} {currency}
      </p>
    </div>
  );
}
