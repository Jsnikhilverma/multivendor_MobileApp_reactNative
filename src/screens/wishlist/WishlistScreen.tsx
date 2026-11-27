
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
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
  Heart,
  HeartOff,
  ShoppingBag,
  Trash2,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const CARD_WIDTH = (width - 55) / 2;

const initialWishlist = [
  {
    id: "1",
    name: "Classic Black",
    subtitle: "Premium Sunglasses",
    price: 1299,
    oldPrice: 1699,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
    discount: "24% OFF",
  },
  {
    id: "2",
    name: "Golden Frame",
    subtitle: "Luxury Sunglasses",
    price: 1599,
    oldPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1518544889283-4a8e9b8e8e8c?auto=format&fit=crop&w=700&q=85",
    discount: "20% OFF",
  },
  {
    id: "3",
    name: "Urban Black",
    subtitle: "Classic Collection",
    price: 1199,
    oldPrice: 1499,
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=700&q=85",
    discount: "20% OFF",
  },
  {
    id: "4",
    name: "Brown Classic",
    subtitle: "Everyday Luxury",
    price: 1399,
    oldPrice: 1799,
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=700&q=85",
    discount: "22% OFF",
  },
];

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

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

  const removeFromWishlist = (id: string) => {
    setWishlist((items) => items.filter((item) => item.id !== id));
  };

  const confirmRemove = (id: string, name: string) => {
    Alert.alert(
      "Remove from Wishlist",
      `Remove "${name}" from your wishlist?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeFromWishlist(id),
        },
      ],
    );
  };

  const formatPrice = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  // ==========================================================
  // EMPTY WISHLIST
  // ==========================================================

  if (wishlist.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#090909" />

        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>YOUR</Text>
            <Text style={styles.headerBrand}>I&T</Text>
            <Text style={styles.headerTitle}>WISHLIST</Text>
          </View>

          <View style={styles.headerIcon}>
            <Heart size={20} color="#D6B77A" />
          </View>
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <HeartOff size={40} color="#A27A3B" strokeWidth={1.4} />
          </View>

          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>

          <Text style={styles.emptyDescription}>
            Save the pieces you love and keep them close. Your favourite
            styles will appear here.
          </Text>

          <Pressable style={styles.emptyButton}>
            <Text style={styles.emptyButtonText}>DISCOVER COLLECTION</Text>
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
              styles.headerContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View>
              <Text style={styles.headerEyebrow}>YOUR</Text>
              <Text style={styles.headerBrand}>I&T</Text>
              <Text style={styles.headerTitle}>WISHLIST</Text>
            </View>

            <View style={styles.headerIcon}>
              <Heart size={20} color="#D6B77A" fill="#D6B77A" />
            </View>
          </Animated.View>
        </View>

        {/* =====================================================
            INTRO
        ===================================================== */}

        <Animated.View
          style={[
            styles.introSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.introTop}>
            <View>
              <Text style={styles.introEyebrow}>SAVED FOR LATER</Text>

              <Text style={styles.introTitle}>Your Favourites</Text>
            </View>

            <View style={styles.countBadge}>
              <Heart size={13} color="#A27A3B" fill="#A27A3B" />

              <Text style={styles.countText}>{wishlist.length}</Text>
            </View>
          </View>

          <Text style={styles.introDescription}>
            A collection of pieces you've loved. Add them to your bag whenever
            you're ready.
          </Text>
        </Animated.View>

        {/* =====================================================
            WISHLIST GRID
        ===================================================== */}

        <View style={styles.grid}>
          {wishlist.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.productCard,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 25],
                        outputRange: [0, index * 6],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Product Image */}

              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />

                <View style={styles.imageOverlay} />

                {/* Discount */}

                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>

                {/* Heart */}

                <Pressable
                  style={styles.heartButton}
                  onPress={() =>
                    confirmRemove(item.id, item.name)
                  }
                >
                  <Heart
                    size={17}
                    color="#A34C43"
                    fill="#A34C43"
                  />
                </Pressable>

                {/* I&T Badge */}

                <View style={styles.itBadge}>
                  <Text style={styles.itBadgeText}>I&T</Text>
                </View>
              </View>

              {/* Product Details */}

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>

                <Text style={styles.productSubtitle}>
                  {item.subtitle}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>
                    {formatPrice(item.price)}
                  </Text>

                  <Text style={styles.oldPrice}>
                    {formatPrice(item.oldPrice)}
                  </Text>
                </View>

                <Pressable style={styles.addButton}>
                  <ShoppingBag size={14} color="#111" />

                  <Text style={styles.addButtonText}>ADD TO BAG</Text>
                </Pressable>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* =====================================================
            WISHLIST INFO
        ===================================================== */}

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Heart size={18} color="#A27A3B" />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>LOVE SOMETHING?</Text>

            <Text style={styles.infoText}>
              Your wishlist keeps your favourite I&T pieces saved until you're
              ready to shop.
            </Text>
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
    paddingBottom: 29,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerEyebrow: {
    color: "#999999",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 3,
  },

  headerBrand: {
    color: "#D6B77A",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 3,
    lineHeight: 38,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 4,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#393939",
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },

  // ==========================================================
  // INTRO
  // ==========================================================

  introSection: {
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 17,
  },

  introTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  introEyebrow: {
    color: "#A27A3B",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 2,
  },

  introTitle: {
    color: "#171717",
    fontSize: 27,
    fontWeight: "700",
    marginTop: 2,
  },

  countBadge: {
    minWidth: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F0E8D9",
    borderWidth: 1,
    borderColor: "#E1D2B8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  countText: {
    color: "#8B6730",
    fontSize: 12,
    fontWeight: "800",
  },

  introDescription: {
    color: "#858078",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 8,
  },

  // ==========================================================
  // GRID
  // ==========================================================

  grid: {
    paddingHorizontal: 22,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productCard: {
    width: CARD_WIDTH,
    marginBottom: 17,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E1DA",
  },

  // ==========================================================
  // IMAGE
  // ==========================================================

  imageContainer: {
    width: "100%",
    height: CARD_WIDTH * 1.12,
    backgroundColor: "#ECE9E3",
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.04)",
  },

  discountBadge: {
    position: "absolute",
    top: 9,
    left: 9,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#171717",
  },

  discountText: {
    color: "#D6B77A",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 33,
    height: 33,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
  },

  itBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.72)",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
  },

  itBadgeText: {
    color: "#D6B77A",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 1,
  },

  // ==========================================================
  // PRODUCT INFO
  // ==========================================================

  productInfo: {
    padding: 11,
  },

  productName: {
    color: "#171717",
    fontSize: 13,
    fontWeight: "800",
  },

  productSubtitle: {
    color: "#918C84",
    fontSize: 9,
    marginTop: 3,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  productPrice: {
    color: "#A27A3B",
    fontSize: 14,
    fontWeight: "800",
  },

  oldPrice: {
    color: "#AAA49C",
    fontSize: 9,
    textDecorationLine: "line-through",
    marginLeft: 6,
  },

  addButton: {
    height: 36,
    marginTop: 10,
    borderRadius: 11,
    backgroundColor: "#D6B77A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  addButtonText: {
    color: "#111111",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  // ==========================================================
  // INFO
  // ==========================================================

  infoCard: {
    marginHorizontal: 22,
    marginTop: 6,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#F0E8D9",
    borderWidth: 1,
    borderColor: "#E1D2B8",
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F8F3EA",
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 11,
  },

  infoTitle: {
    color: "#765728",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  infoText: {
    color: "#8C806E",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 3,
  },

  // ==========================================================
  // EMPTY
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
    fontSize: 24,
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
    letterSpacing: 1.1,
  },

  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    marginHorizontal: 22,
    marginTop: 28,
    paddingTop: 23,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDD8CF",
  },

  footerBrand: {
    color: "#A27A3B",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 3,
  },

  footerTitle: {
    color: "#222222",
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

export default WishlistScreen;

