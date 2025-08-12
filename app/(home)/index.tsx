import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 320);

export default function HomeScreen() {
  const router = useRouter();

  // Estado
  const [isOpen, setIsOpen] = useState(false);

  // Animated values
  const drawerX = useRef(new Animated.Value(-DRAWER_WIDTH)).current; // -W (cerrado) -> 0 (abierto)
  const currentXRef = useRef(-DRAWER_WIDTH);
  const dragStartXRef = useRef(-DRAWER_WIDTH);

  // Sincroniza valor actual
  useEffect(() => {
    const id = drawerX.addListener(({ value }) => (currentXRef.current = value));
    return () => drawerX.removeListener(id);
  }, [drawerX]);

  // Derivados visuales
  const backdropOpacity = drawerX.interpolate({
    inputRange: [-DRAWER_WIDTH, 0],
    outputRange: [0, 0.5],
    extrapolate: "clamp",
  });

  const contentScale = drawerX.interpolate({
    inputRange: [-DRAWER_WIDTH, 0],
    outputRange: [1, 0.94],
    extrapolate: "clamp",
  });

  const contentTranslateX = drawerX.interpolate({
    inputRange: [-DRAWER_WIDTH, 0],
    outputRange: [0, DRAWER_WIDTH * 0.25],
    extrapolate: "clamp",
  });

  // Acciones
  const openDrawer = () => {
    setIsOpen(true);
    Animated.spring(drawerX, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 6,
      speed: 16,
    }).start();
  };

  const closeDrawer = () => {
    Animated.spring(drawerX, {
      toValue: -DRAWER_WIDTH,
      useNativeDriver: true,
      bounciness: 0,
      speed: 20,
    }).start(() => setIsOpen(false));
  };

  // Pan para el drawer (arrastrar para cerrar/abrir parcialmente)
  const drawerPan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          dragStartXRef.current = currentXRef.current;
        },
        onPanResponderMove: (_, g) => {
          const next = Math.max(-DRAWER_WIDTH, Math.min(0, dragStartXRef.current + g.dx));
          drawerX.setValue(next);
        },
        onPanResponderRelease: (_, g) => {
          const finalX = currentXRef.current;
          const shouldClose = g.vx < -0.3 || finalX < -DRAWER_WIDTH * 0.5;
          shouldClose ? closeDrawer() : openDrawer();
        },
      }),
    []
  );

  // Pan en el borde para abrir (edge swipe)
  const edgePan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !isOpen, // solo cuando está cerrado
        onPanResponderGrant: () => {
          dragStartXRef.current = -DRAWER_WIDTH;
          drawerX.setValue(-DRAWER_WIDTH);
        },
        onPanResponderMove: (_, g) => {
          // arrastre hacia la derecha (dx > 0)
          const next = Math.max(-DRAWER_WIDTH, Math.min(0, -DRAWER_WIDTH + g.dx));
          drawerX.setValue(next);
        },
        onPanResponderRelease: (_, g) => {
          const finalX = currentXRef.current;
          const shouldOpen = g.vx > 0.3 || finalX > -DRAWER_WIDTH * 0.6;
          shouldOpen ? openDrawer() : closeDrawer();
        },
      }),
    [isOpen]
  );

  // Datos mock
  const user = {
    username: "YanRPG",
    repos: 42,
    followers: 128,
    level: 7,
    xp: 3400,
    maxXp: 5000,
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
  };
  const xpPercent = Math.round((user.xp / user.maxXp) * 100);

  return (
    <View style={styles.root}>
      {/* Backdrop (tocar afuera cierra) */}
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[styles.backdrop, { opacity: backdropOpacity }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={closeDrawer} />
      </Animated.View>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerX }],
          },
        ]}
        {...drawerPan.panHandlers}
      >
        {/* Perfil */}
        <View style={styles.profileRow}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.username}</Text>
            <View style={styles.levelPill}>
              <Text style={styles.levelText}>Nivel {user.level}</Text>
            </View>
          </View>
        </View>

        {/* Items */}
        <View style={styles.menuList}>
          <MenuItem label="Repositorios" icon="📁" onPress={() => router.push("/")} />
          <MenuItem label="Seguidores" icon="🧍" onPress={() => router.push("/")} />
          <MenuItem label="Configuración" icon="⚙️" onPress={() => router.push("/")} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 RPGHub</Text>
        </View>
      </Animated.View>

      {/* Edge area para swipe-to-open */}
      {!isOpen && <View style={styles.edgeHit} {...edgePan.panHandlers} />}

      {/* Contenido con efecto parallax */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateX: contentTranslateX }, { scale: contentScale }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🏰 GitHub RPG</Text>
          <Pressable onPress={openDrawer} accessibilityRole="button" accessibilityLabel="Abrir menú">
            <Text style={styles.menuButton}>☰</Text>
          </Pressable>
        </View>

        {/* Tarjeta de stats */}
        <View style={styles.card}>
          <View style={styles.userRow}>
            <Image source={{ uri: user.avatar }} style={styles.avatarSmall} />
            <View>
              <Text style={styles.label}>Usuario</Text>
              <Text style={styles.value}>{user.username}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatBadge label="Repos" value={user.repos} />
            <StatBadge label="Seguidores" value={user.followers} />
            <StatBadge label="Nivel" value={user.level} />
          </View>

          {/* XP */}
          <View style={styles.progressWrap}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${xpPercent}%` }]} />
            </View>
            <Text style={styles.xpText}>
              ⚡ {user.xp}/{user.maxXp} XP ({xpPercent}%)
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

/* ---------- Subcomponentes ---------- */

function MenuItem({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
    </Pressable>
  );
}

function StatBadge({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeValue}>{value}</Text>
      <Text style={styles.badgeLabel}>{label}</Text>
    </View>
  );
}

/* ---------- Estilos ---------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0b0b0c",
  },

  // Backdrop
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 10,
  },

  // Drawer
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#121214",
    paddingTop: 56,
    paddingHorizontal: 16,
    zIndex: 20,
    borderRightWidth: 1,
    borderRightColor: "rgba(242,201,76,0.18)",
  },

  edgeHit: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 24, // zona sensible para swipe
    zIndex: 5,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#f2c94c",
    marginRight: 12,
  },
  name: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  levelPill: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(242,201,76,0.14)",
    borderWidth: 1,
    borderColor: "rgba(242,201,76,0.35)",
  },
  levelText: { color: "#f2c94c", fontWeight: "600" },

  menuList: { gap: 6, paddingTop: 8 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pressed: { backgroundColor: "rgba(255,255,255,0.06)" },
  menuIcon: { fontSize: 20, marginRight: 10 },
  menuLabel: { color: "#e7e7e7", fontSize: 16, fontWeight: "600" },

  footer: { marginTop: "auto", paddingVertical: 12 },
  footerText: { color: "#6f6f73", fontSize: 12 },

  // Contenido principal
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    color: "#f2c94c",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  menuButton: { color: "#fff", fontSize: 28 },

  // Tarjeta
  card: {
    backgroundColor: "#151518",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 16,
    elevation: 8,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  avatarSmall: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "rgba(242,201,76,0.6)",
  },
  label: { color: "#8f9096", fontSize: 12 },
  value: { color: "#fff", fontSize: 18, fontWeight: "700" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: "#101015",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  badgeValue: { color: "#f2c94c", fontSize: 18, fontWeight: "800" },
  badgeLabel: { color: "#b8b9bf", fontSize: 12, marginTop: 4 },

  progressWrap: { marginTop: 6 },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#2a2a30",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#f2c94c",
  },
  xpText: { color: "#a9aab0", fontSize: 12, marginTop: 8, textAlign: "right" },
});
