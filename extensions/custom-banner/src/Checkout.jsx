import React, { useEffect, useState } from "react";
import {
  reactExtension,
  Banner,
  useSettings,
  useDeliveryGroups,
  useDeliveryGroup,
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

  const [showBanner, setShowBanner] = useState(false)
  const {trigger_target, trigger_value, description} = useSettings();
  const deliveryGroups = useDeliveryGroups();
  const {
    selectedDeliveryOption,
  } = useDeliveryGroup(deliveryGroups[0]);

useEffect(() => {
  selectedDeliveryOption.carrier.name === trigger_value ? setShowBanner(true) : setShowBanner(false)
}, [selectedDeliveryOption.carrier.name])

  // [END custom-banner.use-settings]
  // if useDeliveryGroups()
  // [START custom-banner.render]
  // Render the banner
  return ( showBanner &&
    <Banner title={`The ${trigger_target} you chose is ${trigger_value}`}>
      {description}
    </Banner>
  );
// [END custom-banner.render]
}
