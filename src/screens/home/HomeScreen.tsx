
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react-native";

// =============================================================
// DEMO DATA
// =============================================================

const categories = [
  {
    id: "1",
    title: "Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "2",
    title: "Women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "3",
    title: "Kids",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "4",
    title: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=500&q=85",
  },
];

const products = [
  {
    id: "1",
    name: "Classic Black Shades",
    price: "₹1,299",
    oldPrice: "₹1,799",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "2",
    name: "Premium Gold Frame",
    price: "₹1,499",
    oldPrice: "₹1,999",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "3",
    name: "Urban Black Edition",
    price: "₹1,199",
    oldPrice: "₹1,599",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=85",
  },
];

// =============================================================
// HOME SCREEN
// =============================================================

const HomeScreen = () => {
  // ===========================================================
  // ANIMATIONS
  // ===========================================================

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(-20)).current;

  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(30)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.stagger(180, [
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(headerTranslate, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(heroTranslate, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(contentTranslate, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#080808"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =====================================================
            TOP HEADER
        ====================================================== */}

        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerOpacity,
              transform: [
                {
                  translateY: headerTranslate,
                },
              ],
            },
          ]}
        >
          <View>
            <Text style={styles.smallGreeting}>
              WELCOME TO
            </Text>

            <Text style={styles.logo}>
              I&T
            </Text>

            <Text style={styles.brandName}>
              FASHION
            </Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.headerIcon}>
              <Search
                size={20}
                color="#FFFFFF"
                strokeWidth={1.7}
              />
            </Pressable>

            <Pressable style={styles.headerIcon}>
              <ShoppingBag
                size={20}
                color="#FFFFFF"
                strokeWidth={1.7}
              />

              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  0
                </Text>
              </View>
            </Pressable>
          </View>
        </Animated.View>

        {/* =====================================================
            SEARCH
        ====================================================== */}

        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: headerOpacity,
            },
          ]}
        >
          <Search
            size={18}
            color="#8D8D8D"
            strokeWidth={1.6}
          />

          <TextInput
            placeholder="Search your style..."
            placeholderTextColor="#777777"
            style={styles.searchInput}
          />

          <View style={styles.searchDivider} />

          <Sparkles
            size={17}
            color="#C9A86A"
            strokeWidth={1.5}
          />
        </Animated.View>

        {/* =====================================================
            HERO
        ====================================================== */}

        <Animated.View
          style={[
            styles.heroContainer,
            {
              opacity: heroOpacity,
              transform: [
                {
                  translateY: heroTranslate,
                },
              ],
            },
          ]}
        >
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <View style={styles.heroTag}>
              <Sparkles
                size={12}
                color="#D6B77A"
                strokeWidth={1.5}
              />

              <Text style={styles.heroTagText}>
                NEW SEASON
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              Elevate{"\n"}Your Style
            </Text>

            <Text style={styles.heroDescription}>
              Discover pieces designed{"\n"}
              to make a statement.
            </Text>

            <Pressable style={styles.heroButton}>
              <Text style={styles.heroButtonText}>
                EXPLORE COLLECTION
              </Text>

              <ArrowRight
                size={16}
                color="#111111"
                strokeWidth={2}
              />
            </Pressable>
          </View>

          <View style={styles.heroPage}>
            <Text style={styles.heroPageActive}>
              01
            </Text>

            <View style={styles.heroPageLine} />

            <Text style={styles.heroPageInactive}>
              03
            </Text>
          </View>
        </Animated.View>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <Animated.View
          style={[
            styles.section,
            {
              opacity: contentOpacity,
              transform: [
                {
                  translateY: contentTranslate,
                },
              ],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                EXPLORE
              </Text>

              <Text style={styles.sectionTitle}>
                Shop By Category
              </Text>
            </View>

            <Pressable style={styles.viewAll}>
              <Text style={styles.viewAllText}>
                VIEW ALL
              </Text>

              <ChevronRight
                size={16}
                color="#C9A86A"
                strokeWidth={1.5}
              />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map(category => (
              <Pressable
                key={category.id}
                style={styles.categoryCard}
              >
                <Image
                  source={{
                    uri: category.image,
                  }}
                  style={styles.categoryImage}
                />

                <View style={styles.categoryOverlay} />

                <Text style={styles.categoryTitle}>
                  {category.title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* =====================================================
            COLLECTION BANNER
        ====================================================== */}

        <Animated.View
          style={[
            styles.collectionBanner,
            {
              opacity: contentOpacity,
            },
          ]}
        >
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=90",
            }}
            style={styles.collectionImage}
            resizeMode="cover"
          />

          <View style={styles.collectionOverlay} />

          <View style={styles.collectionContent}>
            <Text style={styles.collectionEyebrow}>
              I&T EXCLUSIVE
            </Text>

            <Text style={styles.collectionTitle}>
              Timeless{"\n"}Essentials
            </Text>

            <Text style={styles.collectionDescription}>
              Curated styles for{"\n"}
              every moment.
            </Text>

            <Pressable style={styles.collectionButton}>
              <Text style={styles.collectionButtonText}>
                SHOP NOW
              </Text>

              <ArrowRight
                size={15}
                color="#D6B77A"
              />
            </Pressable>
          </View>
        </Animated.View>

        {/* =====================================================
            TRENDING
        ====================================================== */}

        <Animated.View
          style={[
            styles.section,
            {
              opacity: contentOpacity,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>
                CURATED FOR YOU
              </Text>

              <Text style={styles.sectionTitle}>
                Trending Now
              </Text>
            </View>

            <Pressable style={styles.viewAll}>
              <Text style={styles.viewAllText}>
                VIEW ALL
              </Text>

              <ChevronRight
                size={16}
                color="#C9A86A"
              />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          >
            {products.map(product => (
              <Pressable
                key={product.id}
                style={styles.productCard}
              >
                <View style={styles.productImageContainer}>
                  <Image
                    source={{
                      uri: product.image,
                    }}
                    style={styles.productImage}
                  />

                  <Pressable
                    style={styles.wishlistButton}
                  >
                    <Heart
                      size={17}
                      color="#222222"
                      strokeWidth={1.6}
                    />
                  </Pressable>

                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>
                      NEW
                    </Text>
                  </View>
                </View>

                <Text
                  style={styles.productName}
                  numberOfLines={1}
                >
                  {product.name}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>
                    {product.price}
                  </Text>

                  <Text style={styles.oldPrice}>
                    {product.oldPrice}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <View style={styles.footer}>
          <View style={styles.footerLine} />

          <Text style={styles.footerLogo}>
            I&T
          </Text>

          <Text style={styles.footerBrand}>
            FASHION
          </Text>

          <Text style={styles.footerTagline}>
            YOUR STYLE • YOUR STATEMENT
          </Text>

          <Text style={styles.copyright}>
            © 2026 I&T FASHION
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

// =============================================================
// STYLES
// =============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090909",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  // ===========================================================
  // HEADER
  // ===========================================================

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  smallGreeting: {
    color: "#8C8C8C",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 2.5,
    marginBottom: 2,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 4,
    lineHeight: 27,
  },

  brandName: {
    color: "#C9A86A",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 3.5,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  headerIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
  },

  cartBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "#D6B77A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },

  cartBadgeText: {
    color: "#111111",
    fontSize: 8,
    fontWeight: "700",
  },

  // ===========================================================
  // SEARCH
  // ===========================================================

  searchContainer: {
    height: 52,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.11)",

    backgroundColor: "#121212",

    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    marginLeft: 11,
    paddingVertical: 0,
  },

  searchDivider: {
    width: 1,
    height: 22,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginHorizontal: 12,
  },

  // ===========================================================
  // HERO
  // ===========================================================

  heroContainer: {
    height: 430,
    marginHorizontal: 20,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#171717",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.43)",
  },

  heroContent: {
    position: "absolute",
    left: 24,
    bottom: 32,
  },

  heroTag: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  heroTagText: {
    color: "#D6B77A",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 2,
    marginLeft: 7,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 39,
    fontWeight: "600",
    lineHeight: 42,
    letterSpacing: -0.5,
  },

  heroDescription: {
    color: "#D1D1D1",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
  },

  heroButton: {
    height: 43,
    paddingHorizontal: 16,
    marginTop: 19,
    borderRadius: 11,
    backgroundColor: "#D6B77A",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },

  heroButtonText: {
    color: "#111111",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginRight: 10,
  },

  heroPage: {
    position: "absolute",
    right: 18,
    bottom: 25,
    flexDirection: "row",
    alignItems: "center",
  },

  heroPageActive: {
    color: "#D6B77A",
    fontSize: 10,
    fontWeight: "600",
  },

  heroPageLine: {
    width: 25,
    height: 1,
    backgroundColor: "#D6B77A",
    marginHorizontal: 7,
  },

  heroPageInactive: {
    color: "#999999",
    fontSize: 10,
  },

  // ===========================================================
  // SECTIONS
  // ===========================================================

  section: {
    marginTop: 34,
  },

  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 17,
  },

  sectionEyebrow: {
    color: "#C9A86A",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 5,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  viewAll: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    color: "#A8A8A8",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 1.4,
  },

  // ===========================================================
  // CATEGORIES
  // ===========================================================

  categoryList: {
    paddingHorizontal: 20,
  },

  categoryCard: {
    width: 105,
    height: 135,
    borderRadius: 17,
    overflow: "hidden",
    marginRight: 11,
    backgroundColor: "#191919",
  },

  categoryImage: {
    width: "100%",
    height: "100%",
  },

  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  categoryTitle: {
    position: "absolute",
    bottom: 13,
    left: 13,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  // ===========================================================
  // COLLECTION BANNER
  // ===========================================================

  collectionBanner: {
    height: 280,
    marginHorizontal: 20,
    marginTop: 34,
    borderRadius: 23,
    overflow: "hidden",
    backgroundColor: "#171717",
  },

  collectionImage: {
    width: "100%",
    height: "100%",
  },

  collectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.56)",
  },

  collectionContent: {
    position: "absolute",
    left: 22,
    top: 30,
  },

  collectionEyebrow: {
    color: "#D6B77A",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 2,
  },

  collectionTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "600",
    lineHeight: 33,
    marginTop: 10,
  },

  collectionDescription: {
    color: "#C2C2C2",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 9,
  },

  collectionButton: {
    height: 39,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C9A86A",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 16,
  },

  collectionButtonText: {
    color: "#D6B77A",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 1.6,
    marginRight: 8,
  },

  // ===========================================================
  // PRODUCTS
  // ===========================================================

  productList: {
    paddingHorizontal: 20,
  },

  productCard: {
    width: 180,
    marginRight: 14,
  },

  productImageContainer: {
    width: "100%",
    height: 225,
    borderRadius: 17,
    overflow: "hidden",
    backgroundColor: "#181818",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  wishlistButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
  },

  newBadge: {
    position: "absolute",
    left: 10,
    bottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#D6B77A",
  },

  newBadgeText: {
    color: "#111111",
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 1,
  },

  productName: {
    color: "#EAEAEA",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 11,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  productPrice: {
    color: "#D6B77A",
    fontSize: 13,
    fontWeight: "600",
  },

  oldPrice: {
    color: "#777777",
    fontSize: 10,
    textDecorationLine: "line-through",
    marginLeft: 8,
  },

  // ===========================================================
  // FOOTER
  // ===========================================================

  footer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  footerLine: {
    width: 55,
    height: 1,
    backgroundColor: "#C9A86A",
    marginBottom: 17,
  },

  footerLogo: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "700",
    letterSpacing: 5,
  },

  footerBrand: {
    color: "#C9A86A",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 4,
    marginTop: 3,
  },

  footerTagline: {
    color: "#686868",
    fontSize: 7,
    letterSpacing: 2,
    marginTop: 15,
  },

  copyright: {
    color: "#4F4F4F",
    fontSize: 8,
    marginTop: 10,
  },
});
