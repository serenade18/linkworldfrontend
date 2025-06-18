class Config {
    static adminSideBar = [
        {
            index: "1",
            title: "Orders",
            url: "/orders",
            icons: "fi fi-sr-bags-shopping text-lg text-dark"
        },
        {
            index: "2",
            title: "Drivers",
            url: "/drivers",
            icons: "fi fi-sr-driver-man text-lg text-dark"
        },
        {
            index: "3",
            title: "Crate Management",
            url: "/crates",
            icons: "fi fi-sr-apple-crate text-lg text-dark"
        },
        {
            index: "4",
            title: "Route Allocation",
            url: "/routes",
            icons: "fi fi-sr-map-location-track text-lg text-dark"
        },
    ]

    static userSideBar = [
        {
            index: "1",
            title: "Orders",
            url: "/orders",
            icons: "fi fi-sr-bags-shopping text-lg text-dark"
        },
        {
            index: "3",
            title: "Crate Management",
            url: "/crates",
            icons: "fi fi-sr-apple-crate text-lg text-dark"
        },
        {
            index: "4",
            title: "Route Allocation",
            url: "/routes",
            icons: "fi fi-sr-map-location-track text-lg text-dark"
        },
    ]
}

export default Config 