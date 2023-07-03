import { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import Toast from "react-native-root-toast";
import { wishlistCtrl } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { styles } from "./Favorite.styles";

export function Favorite(props) {
  const { productId } = props;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [hasWishlist, setHasWishlist] = useState(undefined);

  useEffect(() => {
    checkWishlist();
  }, [productId]);

  const checkWishlist = async () => {
    try {
      const response = await wishlistCtrl.check(user.id, productId);
      setHasWishlist(response);
    } catch (error) {
      setHasWishlist(false);
    }
  };

  const addWishlist = async () => {
    try {
      setLoading(true);
      await wishlistCtrl.add(user.id, productId);
      setHasWishlist(true);
    } catch (error) {
      Toast.show("Error al añadir el producto a la lista de deseos", {
        position: Toast.positions.CENTER,
      });
    }
    setLoading(false);
  };

  const deleteWishlist = async () => {
    try {
      setLoading(true);
      await wishlistCtrl.delete(user.id, productId);
      setHasWishlist(false);
    } catch (error) {
      Toast.show("Error al eliminar el producto de la lista de deseos", {
        position: Toast.positions.CENTER,
      });
    }

    setLoading(false);
  };

  if (hasWishlist === undefined) return null;

  return (
    <IconButton
      icon="heart"
      style={styles.iconButton}
      size={30}
      iconColor={hasWishlist ? "#16222b" : "#fff"}
      onPress={hasWishlist ? deleteWishlist : addWishlist}
      disabled={loading}
    />
  );
}
