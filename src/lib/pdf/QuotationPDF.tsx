import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Quotation, QuotationItem } from '@/types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1a3a5c',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a3a5c',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a3a5c',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 11,
    color: '#333',
  },
  totalsSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#1a3a5c',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 11,
    color: '#666',
  },
  totalValue: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a3a5c',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#999',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
});

interface QuotationPDFProps {
  quotation: Quotation;
  items: QuotationItem[];
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
}

export const QuotationPDF = ({
  quotation,
  items,
  clientName,
  clientEmail,
  clientCompany,
}: QuotationPDFProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalUnits = items.reduce((sum, item) => {
    const itemUnits = Object.values(item.sizeBreakdown).reduce((a, b) => (a as number) + (b as number), 0) as number;
    return sum + itemUnits;
  }, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>COTIZACIÓN</Text>
          <Text style={styles.subtitle}>PrintyHub - ADMA FASHION</Text>
          <Text style={styles.subtitle}>NIT: 900.XXX.XXX-X</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATOS DEL CLIENTE</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.value}>{clientName}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{clientEmail}</Text>
            </View>
          </View>
          {clientCompany && (
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Empresa</Text>
                <Text style={styles.value}>{clientCompany}</Text>
              </View>
            </View>
          )}
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Fecha de cotización</Text>
              <Text style={styles.value}>{formatDate(quotation.createdAt)}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Válido hasta</Text>
              <Text style={styles.value}>{formatDate(quotation.expiresAt)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Número de cotización</Text>
              <Text style={styles.value}>#{quotation.quotationNumber}</Text>
            </View>
          </View>
        </View>

        {items.map((item, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>PRODUCTO {idx + 1}</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Producto</Text>
                <Text style={styles.value}>{item.productName}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Color</Text>
                <Text style={styles.value}>{item.productColor}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Tallas</Text>
                <Text style={styles.value}>
                  {Object.entries(item.sizeBreakdown)
                    .filter(([, qty]) => (qty as number) > 0)
                    .map(([size, qty]) => `${size}: ${qty}`)
                    .join(', ')}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.value}>{formatPrice(item.itemTotal)}</Text>
              </View>
            </View>
            {item.customizations.length > 0 && (
              <View style={{ marginTop: 5 }}>
                <Text style={styles.label}>Personalizaciones:</Text>
                {item.customizations.map((c, ci) => (
                  <Text key={ci} style={styles.value}>
                    - {c.locationName} ({c.quantity} uds): {formatPrice(c.subtotal)}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total unidades</Text>
            <Text style={styles.totalValue}>{totalUnits} unidades</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal prendas</Text>
            <Text style={styles.totalValue}>{formatPrice(quotation.subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>IVA (19%)</Text>
            <Text style={styles.totalValue}>{formatPrice(quotation.ivaAmount)}</Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={{ fontSize: 14, color: '#1a3a5c' }}>TOTAL</Text>
            <Text style={{ fontSize: 16, color: '#1a3a5c' }}>{formatPrice(quotation.total)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Esta cotización tiene vigencia de 30 días.{'\n'}
          PrintyHub - ADMA FASHION | www.printyhub.com | info@printyhub.com
        </Text>
      </Page>
    </Document>
  );
};
