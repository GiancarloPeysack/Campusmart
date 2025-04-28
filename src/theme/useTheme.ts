export const useTheme = () =>{
    const colors = {
        primary:'#2563EB',
        secondary:'#7C3AED',
        background: '#F5F5F5',
        title: '#4B5563',
        title_1:'#1F2937',
        white:'#FFFFFF',
        gray:'#525252',
        gray1:'#E5E7EB',
        gray2:'#737373',
        green:'#0D9488',
        gray3:'#9CA3AF',
        gray5:'#6B7280',
        gray6:'#F9FAFB',
        buttonGray:'#F3F4F6',
        placeholder:'#ADAEBC',
        light_blue:'#EFF6FF',
        blue:'#1E40AF',
        blue1:'#2563EB',
        red: '#EF4444',
        red1:'#FEF2F2'
    }

    const styles = {
        flex: {
            flex:1
        },
        flexgrow: 1
    }

    return {
        colors,
        styles
    }
}