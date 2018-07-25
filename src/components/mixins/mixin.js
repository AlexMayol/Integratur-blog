export const mixx = {
    methods: {
        scrollTop() {
          //  console.log("hago croll");
            if (document.getElementById('scrollTop')) {
                document.getElementById('scrollTop').scrollIntoView({ block: "start", behavior: "smooth" });
            } else {
                //console.log("no existe")
            }
        }
    }
}