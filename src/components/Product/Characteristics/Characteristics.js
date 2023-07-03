import { markdownToHtml } from "simple-markdown";
import RenderHtml from "react-native-render-html";

export function Characteristics(props) {
  const { text } = props;

  return (
    <RenderHtml contentWidth={200} source={{ html: markdownToHtml(text) }} />
  );
}
