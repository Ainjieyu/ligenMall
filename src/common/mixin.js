import {
    debounce
} from "common/utils.js";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50);
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on("itemImgLoad", this.itemImgListener);
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop,
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
        ShowBackTop(position) {
            this.isShowBackTop = -position.y > 1000;
        }
    }
}