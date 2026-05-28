import { ComponentType } from "react";
import { Text, TextProps } from "react-native";

type WebTextProps = TextProps & {
  className?: string;
  translate?: "no";
};

const WebSafeText = Text as unknown as ComponentType<WebTextProps>;

export function BrandText(props: TextProps) {
  return <WebSafeText {...props} className="notranslate" translate="no" />;
}
