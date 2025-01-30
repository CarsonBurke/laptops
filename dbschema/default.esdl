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
        forOfficeWork: bool;
        forVideoEditing: bool;
        size: int32;
        resolution: int32;
        ram: int32;
        storage: int32;
        cores: int32;
        topFrequency: float32;
        vram: int32;
        hasDedicatedGpu: bool;
        cpuName: str;
        gpuName: str;
        screenType: str;
        priceHistory: array<int32>;
        affiliate: str;
        studentScore: int32;
        gamingScore: int32;
        programmingScore: int32;
        officeWorkScore: int32;
        videoEditingScore: int32;
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

    type Contact {
        title: str;
        name: str;
        content: str;
    }
}