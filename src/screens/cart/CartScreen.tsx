
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ArrowRight,
  ChevronLeft,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react-native";

const initialCartItems = [
  {
    id: "1",
    name: "Classic Black",
    subtitle: "Premium Sunglasses",
    price: 1299,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "2",
    name: "Golden Frame",
    subtitle: "Luxury Sunglasses",
    price: 1599,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1518544889283-4a8e9b8e8e8c?auto=format&fit=crop&w=700&q=85",
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 45,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const updateQuantity = (id: string, type: "increase" | "decrease") => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== id) return item;

          const nextQuantity =
            type === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          return {
            ...item,
            quantity: nextQuantity,
          };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your bag?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setCartItems((currentItems) =>
              currentItems.filter((item) => item.id !== id),
            );
          },
        },
      ],
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;

  const discount = subtotal >= 2500 ? 250 : 0;

  const total = subtotal + shipping - discount;

  const formatPrice = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  // ==========================================================
  // EMPTY CART
  // ==========================================================

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#090909" />

        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>YOUR</Text>
            <Text style={styles.headerBrand}>I&T</Text>
            <Text style={styles.headerTitle}>SHOPPING BAG</Text>
          </View>
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <ShoppingBag size={40} color="#B08A4B" strokeWidth={1.4} />
          </View>

          <Text style={styles.emptyTitle}>Your bag is empty</Text>

          <Text style={styles.emptyDescription}>
            Looks like you haven't added anything to your bag yet. Discover
            something beautiful and make it yours.
          </Text>

          <Pressable style={styles.emptyButton}>
            <Text style={styles.emptyButtonText}>EXPLORE COLLECTION</Text>
            <ArrowRight size={17} color="#111" />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090909" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <View style={styles.header}>
          <Animated.View
            style={[
              styles.headerInner,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View>
              <Text style={styles.headerEyebrow}>YOUR</Text>
              <Text style={styles.headerBrand}>I&T</Text>
              <Text style={styles.headerTitle}>SHOPPING BAG</Text>
            </View>

            <View style={styles.itemBadge}>
              <ShoppingBag size={18} color="#D6B77A" />
              <Text style={styles.itemBadgeText}>
                {cartItems.length} {cartItems.length === 1 ? "ITEM" : "ITEMS"}
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* =====================================================
            DELIVERY MESSAGE
        ===================================================== */}

        <Animated.View
          style={[
            styles.deliveryBanner,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.deliveryIcon}>
            <Truck size={18} color="#9A7439" />
          </View>

          <View style={styles.deliveryTextContainer}>
            <Text style={styles.deliveryTitle}>FREE DELIVERY</Text>
            <Text style={styles.deliverySubtitle}>
              Enjoy complimentary delivery on orders above ₹999
            </Text>
          </View>
        </Animated.View>

        {/* =====================================================
            CART ITEMS
        ===================================================== */}

        <View style={styles.itemsSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>YOUR SELECTION</Text>
              <Text style={styles.sectionTitle}>Shopping Bag</Text>
            </View>

            <Text style={styles.itemCount}>{cartItems.length} items</Text>
          </View>

          {cartItems.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.productCard,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, index * 10],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Product Image */}

              <View style={styles.productImageWrapper}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />

                <View style={styles.productImageBadge}>
                  <Text style={styles.productImageBadgeText}>I&T</Text>
                </View>
              </View>

              {/* Product Info */}

              <View style={styles.productInfo}>
                <View style={styles.productTop}>
                  <View style={styles.productTextContainer}>
                    <Text style={styles.productName}>{item.name}</Text>

                    <Text style={styles.productSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => removeItem(item.id)}
                    style={styles.deleteButton}
                  >
                    <Trash2 size={17} color="#8D8880" />
                  </Pressable>
                </View>

                <Text style={styles.productPrice}>
                  {formatPrice(item.price)}
                </Text>

                <View style={styles.productBottom}>
                  {/* Quantity */}

                  <View style={styles.quantityContainer}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() =>
                        updateQuantity(item.id, "decrease")
                      }
                    >
                      <Minus size={14} color="#222" />
                    </Pressable>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <Pressable
                      style={styles.quantityButton}
                      onPress={() =>
                        updateQuantity(item.id, "increase")
                      }
                    >
                      <Plus size={14} color="#222" />
                    </Pressable>
                  </View>

                  {/* Total */}

                  <Text style={styles.itemTotal}>
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* =====================================================
            COUPON
        ===================================================== */}

        <Animated.View
          style={[
            styles.couponCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.couponIcon}>
            <Tag size={18} color="#A27A3B" />
          </View>

          <View style={styles.couponContent}>
            <Text style={styles.couponTitle}>Have a promo code?</Text>
            <Text style={styles.couponSubtitle}>
              Apply your discount at checkout
            </Text>
          </View>

          <ChevronLeft
            size={18}
            color="#9B968D"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </Animated.View>

        {/* =====================================================
            ORDER SUMMARY
        ===================================================== */}

        <Animated.View
          style={[
            styles.summaryCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>ORDER SUMMARY</Text>

            <View style={styles.summaryLine} />
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              {formatPrice(subtotal)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>

            <Text
              style={[
                styles.summaryValue,
                shipping === 0 && styles.freeText,
              ]}
            >
              {shipping === 0 ? "FREE" : formatPrice(shipping)}
            </Text>
          </View>

          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>

              <Text style={styles.discountText}>
                -{formatPrice(discount)}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalSubtext}>
                Inclusive of applicable taxes
              </Text>
            </View>

            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </Animated.View>

        {/* =====================================================
            CHECKOUT BUTTON
        ===================================================== */}

        <Pressable style={styles.checkoutButton}>
          <View style={styles.checkoutLeft}>
            <ShoppingBag size={19} color="#111" />

            <View>
              <Text style={styles.checkoutSmall}>SECURE CHECKOUT</Text>
              <Text style={styles.checkoutPrice}>
                {formatPrice(total)}
              </Text>
            </View>
          </View>

          <View style={styles.checkoutArrow}>
            <ArrowRight size={19} color="#111" />
          </View>
        </Pressable>

        {/* =====================================================
            TRUST
        ===================================================== */}

        <View style={styles.trustSection}>
          <View style={styles.trustItem}>
            <ShieldCheck size={17} color="#A27A3B" />
            <Text style={styles.trustText}>SECURE PAYMENT</Text>
          </View>

          <View style={styles.trustDot} />

          <View style={styles.trustItem}>
            <Truck size={17} color="#A27A3B" />
            <Text style={styles.trustText}>FAST DELIVERY</Text>
          </View>
        </View>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>I&T</Text>
          <Text style={styles.footerTitle}>FASHION</Text>
          <Text style={styles.footerText}>
            Timeless style. Modern confidence.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3EF",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    backgroundColor: "#090909",
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 28,
  },

  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerEyebrow: {
    color: "#A6A6A6",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 3,
  },

  headerBrand: {
    color: "#D6B77A",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 3,
    lineHeight: 37,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 4,
  },

  itemBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: "#393939",
    backgroundColor: "#151515",
    borderRadius: 22,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },

  itemBadgeText: {
    color: "#D8D8D8",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  // ==========================================================
  // DELIVERY
  // ==========================================================

  deliveryBanner: {
    marginHorizontal: 22,
    marginTop: 20,
    padding: 13,
    backgroundColor: "#F0E8D9",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5D7BF",
  },

  deliveryIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F9F4EA",
    alignItems: "center",
    justifyContent: "center",
  },

  deliveryTextContainer: {
    flex: 1,
    marginLeft: 11,
  },

  deliveryTitle: {
    color: "#765728",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  deliverySubtitle: {
    color: "#8B806E",
    fontSize: 10,
    marginTop: 3,
  },

  // ==========================================================
  // ITEMS
  // ==========================================================

  itemsSection: {
    marginHorizontal: 22,
    marginTop: 27,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  sectionEyebrow: {
    color: "#A27A3B",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
  },

  sectionTitle: {
    color: "#161616",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 2,
  },

  itemCount: {
    color: "#89847D",
    fontSize: 11,
    marginBottom: 4,
  },

  // ==========================================================
  // PRODUCT CARD
  // ==========================================================

  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 11,
    marginBottom: 13,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E9E5DE",
  },

  productImageWrapper: {
    width: 105,
    height: 125,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#ECE9E3",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  productImageBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.72)",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
  },

  productImageBadgeText: {
    color: "#D6B77A",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },

  productInfo: {
    flex: 1,
    marginLeft: 13,
    paddingVertical: 3,
  },

  productTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  productTextContainer: {
    flex: 1,
    paddingRight: 8,
  },

  productName: {
    color: "#1A1A1A",
    fontSize: 15,
    fontWeight: "700",
  },

  productSubtitle: {
    color: "#8A857D",
    fontSize: 10,
    marginTop: 4,
  },

  deleteButton: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#F6F4F0",
    alignItems: "center",
    justifyContent: "center",
  },

  productPrice: {
    color: "#A27A3B",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 12,
  },

  productBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
  },

  quantityContainer: {
    height: 32,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#DDD8D0",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  quantityButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F6F2",
  },

  quantityText: {
    width: 30,
    textAlign: "center",
    color: "#222",
    fontSize: 12,
    fontWeight: "700",
  },

  itemTotal: {
    color: "#171717",
    fontSize: 13,
    fontWeight: "800",
  },

  // ==========================================================
  // COUPON
  // ==========================================================

  couponCard: {
    marginHorizontal: 22,
    marginTop: 8,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E6E1D9",
    flexDirection: "row",
    alignItems: "center",
  },

  couponIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#F3EBDD",
    alignItems: "center",
    justifyContent: "center",
  },

  couponContent: {
    flex: 1,
    marginLeft: 12,
  },

  couponTitle: {
    color: "#242424",
    fontSize: 12,
    fontWeight: "700",
  },

  couponSubtitle: {
    color: "#99938A",
    fontSize: 10,
    marginTop: 3,
  },

  // ==========================================================
  // SUMMARY
  // ==========================================================

  summaryCard: {
    marginHorizontal: 22,
    marginTop: 18,
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E1DA",
  },

  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  summaryTitle: {
    color: "#202020",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.7,
  },

  summaryLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E1DA",
    marginLeft: 12,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  summaryLabel: {
    color: "#858078",
    fontSize: 12,
  },

  summaryValue: {
    color: "#292929",
    fontSize: 12,
    fontWeight: "600",
  },

  freeText: {
    color: "#8D6A31",
    fontWeight: "800",
  },

  discountText: {
    color: "#6F8D59",
    fontSize: 12,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8E4DD",
    marginVertical: 8,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  totalLabel: {
    color: "#1A1A1A",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },

  totalSubtext: {
    color: "#9B968D",
    fontSize: 8,
    marginTop: 3,
  },

  totalValue: {
    color: "#A27A3B",
    fontSize: 20,
    fontWeight: "800",
  },

  // ==========================================================
  // CHECKOUT
  // ==========================================================

  checkoutButton: {
    marginHorizontal: 22,
    marginTop: 18,
    height: 66,
    borderRadius: 20,
    backgroundColor: "#D6B77A",
    paddingLeft: 17,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  checkoutLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  checkoutSmall: {
    color: "#5B4625",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  checkoutPrice: {
    color: "#111",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 2,
  },

  checkoutArrow: {
    width: 49,
    height: 49,
    borderRadius: 16,
    backgroundColor: "#F2E2BD",
    alignItems: "center",
    justifyContent: "center",
  },

  // ==========================================================
  // TRUST
  // ==========================================================

  trustSection: {
    marginTop: 18,
    marginHorizontal: 22,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  trustItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  trustText: {
    color: "#8A857D",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginLeft: 5,
  },

  trustDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#B99A63",
    marginHorizontal: 13,
  },

  // ==========================================================
  // EMPTY CART
  // ==========================================================

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    paddingBottom: 80,
  },

  emptyIcon: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: "#F0E8D9",
    borderWidth: 1,
    borderColor: "#E0D0B3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  emptyTitle: {
    color: "#171717",
    fontSize: 25,
    fontWeight: "700",
  },

  emptyDescription: {
    color: "#858078",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 9,
  },

  emptyButton: {
    marginTop: 23,
    height: 48,
    paddingHorizontal: 19,
    borderRadius: 25,
    backgroundColor: "#D6B77A",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  emptyButtonText: {
    color: "#111",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    marginTop: 27,
    paddingTop: 23,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDD8CF",
    marginHorizontal: 22,
  },

  footerBrand: {
    color: "#A27A3B",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: 3,
  },

  footerTitle: {
    color: "#222",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 5,
    marginTop: -2,
  },

  footerText: {
    color: "#8A857D",
    fontSize: 10,
    marginTop: 8,
  },
});

export default CartScreen;

