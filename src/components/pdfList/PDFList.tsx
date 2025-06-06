import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
});

export const PDFList = ({ data }: { data: Array<any> }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {data.map((item) => (
                        <Text key={item.id}>{item.id} - {item.client} - {item.total}</Text>
                    ))}
                </View>
            </Page>
        </Document>
    )
}
