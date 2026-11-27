
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
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
  Search,
  Sparkles,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const categories = [
  {
    id: "men",
    title: "Men's",
    subtitle: "Sunglasses",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    count: "120+ Styles",
  },
  {
    id: "women",
    title: "Women's",
    subtitle: "Sunglasses",
    image:
      "https://images.unsplash.com/photo-1518544889283-4a8e9b8e8e8c?auto=format&fit=crop&w=900&q=85",
    count: "150+ Styles",
  },
  {
    id: "kids",
    title: "Kids",
    subtitle: "Collection",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85",
    count: "80+ Styles",
  },
  {
    id: "accessories",
    title: "Kids",
    subtitle: "Purses",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    count: "60+ Styles",
  },
];

const CategoryScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const heroScale = useRef(new Animated.Value(1.08)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 45,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(heroScale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCategoryPress = (category: string) => {
    console.log("Selected category:", category);
    // Later:
    // navigation.navigate("ProductListing", { category });
  };

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
              <Text style={styles.smallLabel}>EXPLORE</Text>
              <Text style={styles.brand}>I&T</Text>
              <Text style={styles.headerTitle}>COLLECTIONS</Text>
            </View>

            <Pressable style={styles.searchButton}>
              <Search size={20} color="#F4E7CF" />
            </Pressable>
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
          <View style={styles.introIcon}>
            <Sparkles size={18} color="#D6B77A" />
          </View>

          <Text style={styles.introTitle}>
            Find Your
            <Text style={styles.introTitleGold}> Signature Style</Text>
          </Text>

          <Text style={styles.introDescription}>
            Explore our curated collections designed to bring elegance,
            confidence and timeless style to every look.
          </Text>
        </Animated.View>

        {/* =====================================================
            SEARCH
        ===================================================== */}
        <Animated.View
          style={[
            styles.searchWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Search size={19} color="#888" />

          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </Animated.View>

        {/* =====================================================
            FEATURED BANNER
        ===================================================== */}
        <Animated.View
          style={[
            styles.featuredCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: heroScale }],
            },
          ]}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90",
            }}
            style={styles.featuredImage}
          />

          <View style={styles.featuredOverlay} />

          <View style={styles.featuredContent}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>I&T EXCLUSIVE</Text>
            </View>

            <Text style={styles.featuredTitle}>THE NEW{`\n`}EDIT</Text>

            <Text style={styles.featuredSubtitle}>
              Discover pieces made for your everyday luxury.
            </Text>

            <Pressable style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>EXPLORE</Text>
              <ArrowRight size={16} color="#111" />
            </Pressable>
          </View>
        </Animated.View>

        {/* =====================================================
            CATEGORY TITLE
        ===================================================== */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>SHOP BY</Text>
            <Text style={styles.sectionTitle}>Category</Text>
          </View>

          <View style={styles.categoryLine} />
        </View>

        {/* =====================================================
            CATEGORY CARDS
        ===================================================== */}
        <View style={styles.categoryGrid}>
          {categories.map((category, index) => (
            <Animated.View
              key={category.id}
              style={[
                styles.categoryCardWrapper,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 30 + index * 12],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />

                <View style={styles.categoryOverlay} />

                <View style={styles.categoryContent}>
                  <Text style={styles.categoryCount}>{category.count}</Text>

                  <Text style={styles.categoryTitle}>
                    {category.title}
                  </Text>

                  <Text style={styles.categorySubtitle}>
                    {category.subtitle}
                  </Text>

                  <View style={styles.categoryBottom}>
                    <Text style={styles.shopText}>SHOP NOW</Text>

                    <View style={styles.arrowCircle}>
                      <ChevronRight size={17} color="#111" />
                    </View>
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* =====================================================
            BOTTOM QUOTE
        ===================================================== */}
        <View style={styles.quoteSection}>
          <View style={styles.quoteLine} />

          <Text style={styles.quote}>
            "Style is a way to say who you are without having to speak."
          </Text>

          <Text style={styles.quoteBrand}>— I&T FASHION</Text>

          <View style={styles.quoteLine} />
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
    paddingBottom: 30,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  smallLabel: {
    color: "#A6A6A6",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 3,
    marginBottom: 2,
  },

  brand: {
    color: "#D6B77A",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 3,
    lineHeight: 38,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 5,
  },

  searchButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#3B3B3B",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#151515",
  },

  // ==========================================================
  // INTRO
  // ==========================================================

  introSection: {
    paddingHorizontal: 22,
    paddingTop: 27,
    paddingBottom: 18,
  },

  introIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#17140F",
    borderWidth: 1,
    borderColor: "#3B3020",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  introTitle: {
    color: "#151515",
    fontSize: 29,
    fontWeight: "700",
    lineHeight: 36,
  },

  introTitleGold: {
    color: "#A27A3B",
  },

  introDescription: {
    color: "#77736D",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 10,
    maxWidth: width - 55,
  },

  // ==========================================================
  // SEARCH
  // ==========================================================

  searchWrapper: {
    height: 52,
    marginHorizontal: 22,
    marginBottom: 23,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E1DA",
  },

  searchInput: {
    flex: 1,
    marginLeft: 11,
    color: "#171717",
    fontSize: 14,
  },

  // ==========================================================
  // FEATURED
  // ==========================================================

  featuredCard: {
    height: 290,
    marginHorizontal: 22,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#111",
  },

  featuredImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.48)",
  },

  featuredContent: {
    flex: 1,
    padding: 23,
    justifyContent: "flex-end",
  },

  featuredBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#D6B77A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },

  featuredBadgeText: {
    color: "#D6B77A",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
  },

  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 35,
    fontWeight: "800",
    letterSpacing: 2,
  },

  featuredSubtitle: {
    color: "#E0DED9",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    maxWidth: 260,
  },

  exploreButton: {
    marginTop: 16,
    height: 43,
    paddingHorizontal: 17,
    alignSelf: "flex-start",
    borderRadius: 22,
    backgroundColor: "#E3C98F",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  exploreButtonText: {
    color: "#111111",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  // ==========================================================
  // SECTION HEADER
  // ==========================================================

  sectionHeader: {
    marginTop: 34,
    marginHorizontal: 22,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  sectionEyebrow: {
    color: "#A27A3B",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2.5,
  },

  sectionTitle: {
    color: "#161616",
    fontSize: 27,
    fontWeight: "700",
    marginTop: 2,
  },

  categoryLine: {
    height: 1,
    flex: 1,
    backgroundColor: "#DDD8CF",
    marginLeft: 18,
    marginBottom: 6,
  },

  // ==========================================================
  // CATEGORY GRID
  // ==========================================================

  categoryGrid: {
    marginHorizontal: 22,
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryCardWrapper: {
    width: "48.3%",
    marginBottom: 14,
  },

  categoryCard: {
    height: 245,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#222",
  },

  categoryImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  categoryContent: {
    flex: 1,
    padding: 15,
    justifyContent: "flex-end",
  },

  categoryCount: {
    color: "#D6B77A",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 5,
  },

  categoryTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
    lineHeight: 26,
  },

  categorySubtitle: {
    color: "#E5E5E5",
    fontSize: 11,
    marginTop: 2,
  },

  categoryBottom: {
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  shopText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.3,
  },

  arrowCircle: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#E3C98F",
    alignItems: "center",
    justifyContent: "center",
  },

  // ==========================================================
  // QUOTE
  // ==========================================================

  quoteSection: {
    marginHorizontal: 30,
    marginTop: 28,
    alignItems: "center",
  },

  quoteLine: {
    width: 45,
    height: 1,
    backgroundColor: "#B99A63",
    marginVertical: 13,
  },

  quote: {
    color: "#55514B",
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 20,
    textAlign: "center",
  },

  quoteBrand: {
    color: "#A27A3B",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 10,
  },

  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    marginTop: 25,
    paddingTop: 25,
    paddingBottom: 5,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDD8CF",
    marginHorizontal: 22,
  },

  footerBrand: {
    color: "#A27A3B",
    fontSize: 30,
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
    color: "#8A8781",
    fontSize: 10,
    marginTop: 8,
  },
});

export default CategoryScreen;

