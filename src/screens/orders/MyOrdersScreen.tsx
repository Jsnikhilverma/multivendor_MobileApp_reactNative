
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  Package,
  RotateCcw,
  ShoppingBag,
  Truck,
} from "lucide-react-native";

const COLORS = {
  black: "#090909",
  card: "#141414",
  gold: "#D6B77A",
  champagne: "#E7D5AA",
  white: "#FFFFFF",
  muted: "#A3A3A3",
  border: "#292929",
  green: "#78C091",
  orange: "#D9A15D",
  red: "#D87878",
};

type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  itemCount: number;
  total: number;
  image: string;
};

const orders: Order[] = [
  {
    id: "ORD-1791375318112-5542",
    date: "06 Oct 2026",
    status: "Delivered",
    itemCount: 2,
    total: 2898,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
  },
  {
    id: "ORD-1791274218201-2189",
    date: "02 Oct 2026",
    status: "Shipped",
    itemCount: 1,
    total: 1599,
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800",
  },
  {
    id: "ORD-1791083129402-7312",
    date: "28 Sep 2026",
    status: "Processing",
    itemCount: 3,
    total: 3797,
    image:
      "https://images.unsplash.com/photo-1518544889287-7d7a6b9f2c9a?w=800",
  },
];

const MyOrdersScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Processing", "Shipped", "Delivered"];

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return COLORS.green;
      case "Shipped":
        return COLORS.gold;
      case "Processing":
        return COLORS.orange;
      case "Cancelled":
        return COLORS.red;
      default:
        return COLORS.muted;
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    if (status === "Delivered") {
      return <Package size={15} color={getStatusColor(status)} />;
    }

    if (status === "Shipped") {
      return <Truck size={15} color={getStatusColor(status)} />;
    }

    return <Clock3 size={15} color={getStatusColor(status)} />;
  };

  const renderOrder = ({ item }: { item: Order }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <Pressable
        style={styles.orderCard}
        onPress={() => {
          Alert.alert(
            "Order Details",
            `Order: ${item.id}\nStatus: ${item.status}\nTotal: ₹${item.total}`
          );
        }}
      >
        <View style={styles.orderTop}>
          <View>
            <Text style={styles.orderLabel}>ORDER ID</Text>
            <Text style={styles.orderId}>{item.id}</Text>
          </View>

          <ChevronRight size={20} color={COLORS.muted} />
        </View>

        <View style={styles.divider} />

        <View style={styles.orderBody}>
          <Image source={{ uri: item.image }} style={styles.productImage} />

          <View style={styles.orderInfo}>
            <View style={styles.statusRow}>
              {getStatusIcon(item.status)}

              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.status}
              </Text>
            </View>

            <Text style={styles.itemText}>
              {item.itemCount} {item.itemCount === 1 ? "Item" : "Items"}
            </Text>

            <Text style={styles.dateText}>{item.date}</Text>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalPrice}>₹{item.total.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.orderBottom}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() =>
              Alert.alert("Order Tracking", "Tracking details will appear here.")
            }
          >
            <Text style={styles.secondaryButtonText}>
              {item.status === "Delivered" ? "VIEW ORDER" : "TRACK ORDER"}
            </Text>
          </Pressable>

          {item.status === "Delivered" && (
            <Pressable
              style={styles.reorderButton}
              onPress={() => Alert.alert("Reorder", "Items added to your bag.")}
            >
              <RotateCcw size={15} color={COLORS.black} />
              <Text style={styles.reorderText}>REORDER</Text>
            </Pressable>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.black}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={21} color={COLORS.white} />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerSmall}>I&T FASHION</Text>
            <Text style={styles.headerTitle}>MY ORDERS</Text>
          </View>

          <View style={styles.headerIcon}>
            <ShoppingBag size={20} color={COLORS.gold} />
          </View>
        </View>

        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              <View style={styles.intro}>
                <Text style={styles.eyebrow}>YOUR SHOPPING JOURNEY</Text>
                <Text style={styles.heading}>Order History</Text>
                <Text style={styles.description}>
                  Track your purchases and manage all your I&T orders in one
                  place.
                </Text>
              </View>

              {/* Filters */}
              <FlatList
                horizontal
                data={filters}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterList}
                renderItem={({ item }) => {
                  const active = activeFilter === item;

                  return (
                    <Pressable
                      onPress={() => setActiveFilter(item)}
                      style={[
                        styles.filterButton,
                        active && styles.filterButtonActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterText,
                          active && styles.filterTextActive,
                        ]}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  );
                }}
              />

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>RECENT ORDERS</Text>
                <Text style={styles.orderCount}>
                  {filteredOrders.length} ORDERS
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <ShoppingBag size={34} color={COLORS.gold} />
              </View>

              <Text style={styles.emptyTitle}>NO ORDERS FOUND</Text>

              <Text style={styles.emptyText}>
                You haven't placed any orders in this category yet.
              </Text>

              <Pressable
                style={styles.shopButton}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.shopButtonText}>START SHOPPING</Text>
              </Pressable>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.footerBrand}>I&T</Text>
              <Text style={styles.footerText}>FASHION</Text>
              <Text style={styles.footerSub}>
                Timeless style. Everyday luxury.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  header: {
    height: 78,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerSmall: {
    fontSize: 9,
    letterSpacing: 2.5,
    color: COLORS.gold,
    fontWeight: "600",
  },

  headerTitle: {
    marginTop: 3,
    fontSize: 17,
    letterSpacing: 2.5,
    color: COLORS.white,
    fontWeight: "800",
  },

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 30,
  },

  intro: {
    marginBottom: 18,
  },

  eyebrow: {
    fontSize: 10,
    color: COLORS.gold,
    letterSpacing: 2,
    fontWeight: "700",
  },

  heading: {
    marginTop: 6,
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "800",
  },

  description: {
    marginTop: 7,
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
  },

  filterList: {
    paddingBottom: 24,
    gap: 9,
  },

  filterButton: {
    paddingHorizontal: 18,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  filterButtonActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  filterText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  filterTextActive: {
    color: COLORS.black,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
  },

  orderCount: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: "700",
  },

  orderCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderLabel: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 1.3,
    fontWeight: "700",
  },

  orderId: {
    marginTop: 4,
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 13,
  },

  orderBody: {
    flexDirection: "row",
    alignItems: "center",
  },

  productImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#222222",
  },

  orderInfo: {
    flex: 1,
    marginLeft: 12,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusText: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: "800",
  },

  itemText: {
    marginTop: 8,
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },

  dateText: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 10,
  },

  priceBox: {
    alignItems: "flex-end",
  },

  totalLabel: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 1,
  },

  totalPrice: {
    marginTop: 4,
    color: COLORS.champagne,
    fontSize: 16,
    fontWeight: "800",
  },

  orderBottom: {
    flexDirection: "row",
    gap: 9,
    marginTop: 15,
  },

  secondaryButton: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  reorderButton: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  reorderText: {
    color: COLORS.black,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 25,
  },

  emptyIcon: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 20,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  emptyText: {
    marginTop: 8,
    color: COLORS.muted,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 19,
  },

  shopButton: {
    marginTop: 20,
    height: 45,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },

  shopButtonText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  footer: {
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 10,
  },

  footerBrand: {
    color: COLORS.gold,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 3,
  },

  footerText: {
    marginTop: -2,
    color: COLORS.white,
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: "700",
  },

  footerSub: {
    marginTop: 8,
    color: COLORS.muted,
    fontSize: 10,
  },
});

export default MyOrdersScreen;
