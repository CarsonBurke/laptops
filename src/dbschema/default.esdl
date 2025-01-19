module default {

    type Laptop {
        name: str;
        price: int32;
        saleOf: int32;
        titleImage: bytes;
        windows: bool;
        macos: bool;
        linux: bool;
        forStudents: bool;
        forGaming: bool;
        forProgrammers: bool;
        forWork: bool;
        size: int32;
        ram: int32;
        storage: int32;
        cores: int32;
        topFrequency: float32;
        priceHistory: array<int32>;
        affiliate: str;
    }

    type Author {
        name: str;
        description: str;
        profileImage: bytes;
    }

    type Article {
        title: str;
        content: str;
        titleImage: bytes;
        author: Author;
        published: datetime;
    }
}