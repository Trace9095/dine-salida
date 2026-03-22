import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SALIDA_RESTAURANTS } from '../data/restaurants'

const FEATURED = SALIDA_RESTAURANTS.filter((r) => r.featured)

export default function HomeScreen() {
  function openWebsite() {
    Linking.openURL('https://dinesalida.com')
  }

  function openRestaurant(website: string) {
    if (website) Linking.openURL(website)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Ionicons name="location-outline" size={28} color="#D4A853" />
          <Text style={styles.headerTitle}>Dine Salida</Text>
        </View>
        <Text style={styles.headerSub}>Salida, Colorado Restaurant Guide</Text>
      </View>

      {/* Featured section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Restaurants</Text>

        {FEATURED.map((r) => (
          <View key={r.slug} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardName}>{r.name}</Text>
                <Text style={styles.cardPrice}>{r.priceRange}</Text>
              </View>
              <Text style={styles.cardCuisine}>{r.cuisineType}</Text>
            </View>

            <Text style={styles.cardDesc} numberOfLines={2}>
              {r.shortDescription}
            </Text>

            <View style={styles.cardFooter}>
              <View style={styles.addressRow}>
                <Ionicons name="map-outline" size={14} color="#8B949E" />
                <Text style={styles.cardAddress} numberOfLines={1}>
                  {r.address}
                </Text>
              </View>

              {r.website ? (
                <TouchableOpacity
                  onPress={() => openRestaurant(r.website)}
                  style={styles.visitBtn}
                  accessibilityLabel={`Visit ${r.name} website`}
                  accessibilityRole="button"
                >
                  <Ionicons name="globe-outline" size={14} color="#0D1117" />
                  <Text style={styles.visitBtnText}>Visit</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ))}
      </View>

      {/* All restaurants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Restaurants</Text>
        {SALIDA_RESTAURANTS.map((r) => (
          <View key={r.slug} style={styles.listRow}>
            <View style={styles.listRowLeft}>
              <Ionicons name="restaurant-outline" size={18} color="#D4A853" />
              <View style={styles.listRowText}>
                <Text style={styles.listRowName}>{r.name}</Text>
                <Text style={styles.listRowCuisine}>{r.cuisineType}</Text>
              </View>
            </View>
            <Text style={styles.listRowPrice}>{r.priceRange}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        onPress={openWebsite}
        style={styles.ctaBtn}
        accessibilityLabel="View full directory at dinesalida.com"
        accessibilityRole="button"
      >
        <Ionicons name="arrow-forward-outline" size={18} color="#0D1117" />
        <Text style={styles.ctaBtnText}>View Full Directory</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>dinesalida.com</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#30363D',
    backgroundColor: '#161B22',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#D4A853',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#8B949E',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E6EDF3',
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#161B22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#30363D',
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E6EDF3',
    flex: 1,
    marginRight: 8,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D4A853',
  },
  cardCuisine: {
    fontSize: 12,
    color: '#8B949E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardDesc: {
    fontSize: 13,
    color: '#8B949E',
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  cardAddress: {
    fontSize: 12,
    color: '#8B949E',
    flex: 1,
  },
  visitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D4A853',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    minHeight: 44,
  },
  visitBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0D1117',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#30363D',
    minHeight: 44,
  },
  listRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  listRowText: {
    flex: 1,
  },
  listRowName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
  },
  listRowCuisine: {
    fontSize: 12,
    color: '#8B949E',
  },
  listRowPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D4A853',
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#D4A853',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    minHeight: 44,
  },
  ctaBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D1117',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#30363D',
  },
})
