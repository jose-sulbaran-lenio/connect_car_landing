import React, { useState, useEffect } from "react";
import NavbarBp from "react-bootstrap/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Offcanvas } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { Button } from "../Button";
import { classNames } from "../../utils";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNavbarOpen(false);
  }, [router.pathname]);

  return (
    <NavbarBp
      className={classNames(
        "py-3",
        styles.navbar,
        styles.fixed_lg_top,
        router.pathname === "/" && styles.home,
        navbarOpen && styles.boxShadowOff,
        navbarOpen && styles.noHomeOpenButton,
        styles.noHome,
      )}
      expand="lg"
    >
      <Container className={styles.innerContainerNavbar}>
        <NavbarBp.Brand
          className={classNames(styles.brandLogo)}
          onClick={() => {
            router.push("/");
          }}
        />
        <button
          className={classNames(styles.buttonMenu)}
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <div
            className={classNames(
              styles.animatedMenu,
              navbarOpen && styles.menuOpen,
              styles.noHomeButton,
            )}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <NavbarBp.Collapse id="main-navbar" className={styles.navbarHide}>
          <Nav className={classNames("mx-auto gap-lg-4", styles.navLinks)}>
            <Nav.Link
              as={Link}
              className={classNames(
                "text-primary",
                router.pathname.includes("find-car") && styles.active,
              )}
              href="/find-car"
            >
              Encuentra tu auto favorito
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={classNames(
                "text-primary",
                router.pathname.includes("how-work") && styles.active,
              )}
              href="/how-work"
            >
              ¿Cómo Funciona?
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={classNames(
                "text-primary",
                router.pathname.includes("/us") && styles.active,
              )}
              href="/us"
            >
              Nosotros
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={classNames(
                "text-primary",
                router.pathname.includes("/fqa") && styles.active,
              )}
              href="/fqa"
            >
              Preguntas Frecuentes
            </Nav.Link>
          </Nav>
          <Button variant="outline-primary" small>
            Iniciar sesión <FiUser />
          </Button>
        </NavbarBp.Collapse>
        <Offcanvas
          show={navbarOpen}
          placement="top"
          onHide={() => {
            setNavbarOpen(false);
          }}
          id="main-navbar"
          className={classNames(styles.offcanvasContainer)}
          scroll={false}
        >
          <Offcanvas.Body>
            <Container>
              <div className={classNames(styles.rowLogo)}>
                <NavbarBp.Brand
                  className={styles.brandLogo}
                  onClick={() => {
                    router.push("/");
                  }}
                />
              </div>
              <Nav className={classNames("gap-lg-4", styles.navLinksMobile)}>
                <Nav.Link
                  as={Link}
                  className={classNames(
                    "text-primary",
                    router.pathname.includes("find-car") && styles.active,
                  )}
                  href="/find-car"
                >
                  Encuentra tu auto favorito
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className={classNames(
                    "text-primary",
                    router.pathname.includes("how-work") && styles.active,
                  )}
                  href="/how-work"
                >
                  ¿Cómo Funciona?
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className={classNames(
                    "text-primary",
                    router.pathname.includes("/us") && styles.active,
                  )}
                  href="/us"
                >
                  Nosotros
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className={classNames(
                    "text-primary",
                    router.pathname.includes("/fqa") && styles.active,
                  )}
                  href="/fqa"
                >
                  Preguntas Frecuentes
                </Nav.Link>
              </Nav>
              <Button variant="outline-primary" small>
                Iniciar sesión <FiUser />
              </Button>
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </NavbarBp>
  );
}
