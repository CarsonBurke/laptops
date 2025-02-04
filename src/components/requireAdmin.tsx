import { ReactNode } from "react";

export default function RequireAdmin({ children }: { children: ReactNode }) {
    

    return (
        <main className="main">
            <section className="sectionPadded">
                <div className="column background2 borderBg3 gapMedium paddingMedium">
                    <h1 className="textLarge textCenter">You must be logged in as an admin to access this page.</h1>
                </div>
            </section>
        </main>
    );
}