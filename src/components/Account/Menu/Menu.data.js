import { screensName } from "../../../utils";

export const accountMenu = [
  {
    title: "Cambiar nombre y apellidos",
    description: "Cambiar el nombre de tu cuenta",
    leftIcon: "emoticon-excited-outline",
    screen: screensName.account.changeName,
  },
  {
    title: "Cambiar email",
    description: "Cambia el email de tu cuenta",
    leftIcon: "at",
    screen: screensName.account.changeEmail,
  },
  {
    title: "Cambiar nombre de usuario",
    description: "Cambia el nombre de usuario de tu cuenta",
    leftIcon: "card-account-details-outline",
    screen: screensName.account.changeUsername,
  },
  {
    title: "Cambiar contraseña",
    description: "Cambia el contraseña de tu cuenta",
    leftIcon: "key-outline",
    screen: screensName.account.changePassword,
  },
];

export const appMenu = [
  {
    title: "Pedidos",
    description: "Lista de todos los pedidos",
    leftIcon: "order-bool-descending-variant",
    screen: screensName.account.orders,
  },
  {
    title: "Mis direcciones",
    description: "Administra tus direcciones de envio",
    leftIcon: "map-marker-outline",
    screen: screensName.account.addresses,
  },
  {
    title: "Lista de deseos",
    description: "Lista de todos los productos que te quieres comprar",
    leftIcon: "heart-outline",
    screen: screensName.wishlist.root,
  },
];
