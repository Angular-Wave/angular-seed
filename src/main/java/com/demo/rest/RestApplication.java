package com.demo.rest;

import java.io.IOException;
import java.util.Random;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/hello")
public class RestApplication extends HttpServlet {
    Random random = new Random();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("greeting", "Java success");
        request.setAttribute("counter", random.nextInt(100));
        request.getRequestDispatcher("/views/index.jsp").forward(request, response);
    }
}