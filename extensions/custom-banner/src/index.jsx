import React from "react";
import {
  reactExtension,
  Banner,
  useSettings,
} from "@shopify/ui-extensions-react/checkout";

// [START custom-banner.ext-point]
// Set the entry points for the extension
const checkoutBlock = reactExtension("purchase.checkout.block.render", () => <App />);
export { checkoutBlock };

const deliveryAddress = reactExtension("purchase.checkout.delivery-address.render-before", () => <App />);
export { deliveryAddress };
// [END custom-banner.ext-point]

function App() {
  // [START custom-banner.use-settings]
  // Use the merchant-defined settings to retrieve the extension's content
  // Use the merchant-defined settings to retrieve the extension's content
  const {title: merchantTitle, description, collapsible, status: merchantStatus} = useSettings();

  // Set a default status for the banner if a merchant didn't configure the banner in the checkout editor
  const status = merchantStatus ?? 'info';
  const title = merchantTitle ?? 'Custom Banner';
  // [END custom-banner.use-settings]

  // [START custom-banner.render]
  // Render the banner
  return (
    <Banner title={title} status={status} collapsible={collapsible}>
      {description}
    </Banner>
  );
// [END custom-banner.render]
}
