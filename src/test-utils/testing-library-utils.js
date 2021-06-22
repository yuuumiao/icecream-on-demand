import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const rednerWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

//re-export everything
export * from "@testing-library/react";

//override render method
export { rednerWithContext as render };
//so whenever you want to render with context, importing forom test-utils, otherwise importing from the normal testing-lib

//for more info : https://testing-library.com/docs/react-testing-library/setup
