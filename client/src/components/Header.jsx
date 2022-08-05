import { Heading } from "@hope-ui/solid";
export default function Header(props) {
  return <Heading level={props.level}>{props.text}</Heading>;
}
